import { CoffiButton } from "../common/CoffiButton";
import InputFeedbackMessage from "../common/InputFeedbackMessage";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import useWaitlistFormLogic from "./useWaitlistFormLogic";



const WaitlistForm = () => {
    const {
        useWaitlistForm,
        createWaitlistUserMutationIsPending,
        displayWaitlistForm,
        setDisplayWaitlistForm,
        onSave,
        onCloseForm
    } = useWaitlistFormLogic();

    const { register, formState: { errors }, handleSubmit } = useWaitlistForm

    return (
        <Dialog
            open={displayWaitlistForm}
            onOpenChange={setDisplayWaitlistForm}
        >
            <DialogTrigger asChild>
                <CoffiButton
                    variant="default"
                    className="w-fit text-blackMain bg-whiteMain hover:bg-whiteMain/80"
                >Únete a la waitlist</CoffiButton>
            </DialogTrigger>
            <DialogContent
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                }}
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                }}
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Unirse a la lista</DialogTitle>
                    <DialogDescription>
                        Completa los campos para unirte a la lista y ser de los primeros en conseguir y probar nuestro café!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <Input
                            placeholder="Nombre"
                            {...register("name")}
                            status={errors.name && "ERROR"}
                        />
                        {
                            errors.name && <InputFeedbackMessage status="ERROR" message={errors.name.message} />
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <Input
                            placeholder="Correo electrónico"
                            {...register("email")}
                            status={errors.email && "ERROR"}
                        />
                        {
                            errors.email && <InputFeedbackMessage status="ERROR" message={errors.email.message} />
                        }
                    </div>
                </div>
                <DialogFooter className="flex flex-row items-center justify-between gap-2">
                    <DialogClose asChild>
                        <CoffiButton onClick={onCloseForm} type="button" variant="secondary">
                            Descartar
                        </CoffiButton>
                    </DialogClose>
                    <CoffiButton
                        variant='default'
                        onClick={handleSubmit(onSave)}
                        isPending={createWaitlistUserMutationIsPending}
                    >
                        Enviar
                    </CoffiButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default WaitlistForm;