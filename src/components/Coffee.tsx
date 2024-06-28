import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { EffectComposer, OrbitControls, OutputPass, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import { type GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Coffee = () => {
    const containerRef = useRef<HTMLCanvasElement | null>(null);
    const [model, setModel] = useState<GLTF | null>(null);

    useEffect(() => {
        const loader = new GLTFLoader();

        loader.setCrossOrigin('anonymous')
        // Load a glTF resource
        loader.load(
            // resource URL
            '/cat_mug/scene.gltf',
            // called when the resource is loaded
            function (gltf) {
                setModel(gltf);
            },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log(error);
            }
        );
    }, []);

    useEffect(() => {
        const bufferGeometry = new THREE.BufferGeometry();
        const material = new THREE.Material();
        const texture = new THREE.Texture();
        const renderTarget = new THREE.WebGLRenderTarget();
        const clock = new THREE.Clock();

        if (containerRef?.current && typeof window !== undefined && model) {
            const sizes = {
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight
            };

            const scene = new THREE.Scene();

            //Camera
            const camera = new THREE.PerspectiveCamera(
                50,
                sizes.width / sizes.height,
                0.1,
                2000
            );
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix();

            //Lights
            const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 2);
            hemiLight.position.set(0, 20, 0);

            const dirLight = new THREE.DirectionalLight(0xffffff, 5);
            dirLight.position.set(10, 10, 10);
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 2;
            dirLight.shadow.camera.bottom = - 2;
            dirLight.shadow.camera.left = - 2;
            dirLight.shadow.camera.right = 2;
            dirLight.shadow.camera.near = 0.1;
            dirLight.shadow.camera.far = 40;

            const twoLight = new THREE.DirectionalLight(0xffffff, 5);
            twoLight.position.set(-10, -10, -10);
            twoLight.castShadow = true;
            twoLight.shadow.camera.top = 2;
            twoLight.shadow.camera.bottom = - 2;
            twoLight.shadow.camera.left = - 2;
            twoLight.shadow.camera.right = 2;
            twoLight.shadow.camera.near = 0.1;
            twoLight.shadow.camera.far = 40;

            const threeLight = new THREE.DirectionalLight(0xffffff, 5);
            threeLight.position.set(10, -10, -10);
            threeLight.castShadow = true;
            threeLight.shadow.camera.top = 2;
            threeLight.shadow.camera.bottom = - 2;
            threeLight.shadow.camera.left = - 2;
            threeLight.shadow.camera.right = 2;
            threeLight.shadow.camera.near = 0.1;
            threeLight.shadow.camera.far = 40;

            const fourLight = new THREE.DirectionalLight(0xffffff, 5);
            fourLight.position.set(-10, 10, 10);
            fourLight.castShadow = true;
            fourLight.shadow.camera.top = 2;
            fourLight.shadow.camera.bottom = - 2;
            fourLight.shadow.camera.left = - 2;
            fourLight.shadow.camera.right = 2;
            fourLight.shadow.camera.near = 0.1;
            fourLight.shadow.camera.far = 40;

            //render
            const renderer = new THREE.WebGLRenderer({ canvas: containerRef.current, antialias: true });
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputColorSpace = THREE.SRGBColorSpace;

            const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), 0.2, 0, 0.5);

            const renderScene = new RenderPass(scene, camera);

            const bloomComposer = new EffectComposer(renderer);
            bloomComposer.addPass(renderScene);
            bloomComposer.addPass(bloomPass);

            const outputPass = new OutputPass();
            bloomComposer.addPass(outputPass);

            const box = new THREE.Box3().setFromObject(model.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const resultSize = size.length();

            model.scene.position.y -= center.y
            model.scene.position.x -= center.x
            model.scene.position.z -= center.z

            camera.position.x = -resultSize;
            camera.position.y = 0;
            camera.position.z = -resultSize;
            camera.updateProjectionMatrix();

            //controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enableZoom = false
            controls.enablePan = false

            const mixer = new THREE.AnimationMixer(model.scene);

            const clipAnimation = model.animations[0];

            model.scene.traverse((o) => {
                //@ts-expect-error The property isMesh of objects exist but is not defined in the set of types for threeJS
                if (o.isMesh) {
                    //@ts-expect-error The property material of objects exist but is not defined in the set of types for threeJS
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    o.material.wireframe = false;
                }
            })

            if (clipAnimation) {
                mixer.clipAction(clipAnimation).reset().play();
            }

            scene.add(model.scene);
            scene.add(camera);
            scene.add(dirLight);
            scene.add(hemiLight);
            scene.add(twoLight);
            scene.add(threeLight);
            scene.add(fourLight);

            const animate = () => {
                const delta = clock.getDelta();

                controls.update(delta);
                mixer.update(delta);
                bloomComposer.render(delta);
                requestAnimationFrame(animate);
            }

            animate();
        }

        return () => {
            bufferGeometry.dispose();
            material.dispose();
            texture.dispose();
            renderTarget.dispose();
        };
    }, [containerRef, model])

    return (
        <div className='flex gap-2 w-full max-w-[400px] h-[400px] relative overflow-hidden rounded-full'>
            <canvas ref={containerRef} className='w-full h-full absolute bg-transparent' />
        </div>
    )
}

export default Coffee;