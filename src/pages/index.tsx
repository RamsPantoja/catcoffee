import Head from "next/head";
import Coffee from "~/components/Coffee";
import WaitlistForm from "~/components/WaitlistForm";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coffi - Café para desarrolladores</title>
        <meta name="description" content="" />
        <link rel="icon" href="/coffi.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blackMain to-blackLigth">
        <div className="container flex flex-col justify-center gap-16 px-4 py-16 ">
          <div className="flex">
            <span className="text-2xl text-white font-black"> {"<Coff/>"}</span>
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-7xl text-white font-black text-center">
              El café que impulsa la innovación
            </h1>
            <h2 className="text-grayStrong text-2xl font-semibold text-center">Impulsando la productividad y la creatividad de los Developers</h2>
            <div className="flex flex-col items-center gap-2">
              <WaitlistForm />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <Coffee />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-whiteMain font-bold text-4xl">Misión</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Card className="flex-col flex gap-1 border-none">
                <p className="text-grayStrong">
                  Como desarrolladores, entendemos lo crucial que es para ti mantenerte inspirado y energizado, ya sea para completar tus tareas diarias o para continuar con tus proyectos personales después de la jornada laboral. Por eso, nos dedicamos a ofrecerte más que solo café; queremos brindarte una marca con la que realmente conectes y te identifiques.
                  Con un enfoque innovador y una pasión por la excelencia, buscamos ser el combustible que impulsa a las mentes brillantes a desarrollar soluciones tecnológicas que transformen el mundo. Comprometidos con la sostenibilidad y el bienestar de nuestros clientes, trabajamos incansablemente para proporcionar una experiencia cafetera tan única y dinámica como los profesionales que servimos.
                </p>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-whiteMain font-bold text-4xl">Tu café como te gusta</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Card className="flex-col flex gap-1 max-w-96  border-none">
                <p className="text-whiteMain font-bold text-lg">Café en Grano</p>
                <p className="text-grayStrong">Descubre el sabor auténtico y la frescura insuperable de nuestro café en grano. Seleccionado cuidadosamente, nuestros granos enteros preservan todos los aceites esenciales y aromas que hacen de cada taza una experiencia única. Ideal para los amantes del café que disfrutan de moler sus granos justo antes de preparar su bebida, garantizando así el máximo frescor y sabor.</p>
              </Card>
              <Card className="flex-col flex gap-1 max-w-96  border-none">
                <p className="text-whiteMain font-bold text-lg">Café Molido</p>
                <p className="text-grayStrong">Facilita tu ritual diario del café con nuestro café molido premium. Preparado a partir de granos seleccionados y tostados a la perfección, nuestro café molido ofrece una conveniencia sin igual sin sacrificar la calidad. Perfecto para cafetera de filtro, prensa francesa, o máquinas de espresso, este café está molido uniformemente para asegurar una extracción óptima y un sabor equilibrado en cada taza.</p>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <p className="text-whiteMain font-bold text-4xl">Preparalo a tu gusto y disfruta</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Card className="flex-col flex gap-1 max-w-60 hover:border-whiteMain">
                <p className="text-whiteMain font-bold text-lg">Agile Americano</p>
                <p className="text-grayStrong">Suave y rápido, como tus ciclos de sprint.</p>
              </Card>
              <Card className="flex-col flex gap-1 max-w-60 hover:border-whiteMain">
                <p className="text-whiteMain font-bold text-lg">Full-Stack Blend</p>
                <p className="text-grayStrong">Una combinación equilibrada tanto para desarrolladores de front-end como de back-end.</p>
              </Card>
              <Card className="flex-col flex gap-1 max-w-60 hover:border-whiteMain">
                <p className="text-whiteMain font-bold text-lg">Debug Dark Roast</p>
                <p className="text-grayStrong">Un café fuerte y audaz para potenciar las sesiones de depuración.</p>
              </Card>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-2xl text-white font-black"> {"<Coff/>"}</span>
              <p className="text-white">El café que impulsa la innovación</p>
              <span className="text-white text-xs mt-10">Hecho con amor ♥️</span>
            </div>
            <div className="">
            </div>
          </div>
        </div>
      </main>
    </>
  );
}