import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { useState } from "react";

const waitlistValidationSchema = z
    .object({
        name: z.string({
            required_error: "Campo requerido"
        }).min(1, "Campo requerido"),
        email: z.string({
            required_error: "Campo requerido"
        }).min(1, "Campo requerido").email("El email no es valido"),
    });

export type WaitlistValidationSchema = z.infer<typeof waitlistValidationSchema>

const useWaitlistFormLogic = () => {
    const [displayWaitlistForm, setDisplayWaitlistForm] = useState<boolean>(false);
    const useWaitlistForm = useForm<WaitlistValidationSchema>({
        resolver: zodResolver(waitlistValidationSchema),
        defaultValues: {
            name: "",
            email: ""
        }
    });

    const { mutate: createWaitlistUserMutation, isPending: createWaitlistUserMutationIsPending } = api.waitlistUser.create.useMutation({
        onSuccess: async () => {
            useWaitlistForm.reset();
            toast.success("Gracias por unirte!");
            setDisplayWaitlistForm(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onSave = (data: WaitlistValidationSchema) => {
        createWaitlistUserMutation({
            name: data.name,
            email: data.email
        });
    }

    const onCloseForm = () => {
        useWaitlistForm.reset();
        setDisplayWaitlistForm(false);
    }

    return {
        useWaitlistForm,
        createWaitlistUserMutationIsPending,
        displayWaitlistForm,
        setDisplayWaitlistForm,
        onSave,
        onCloseForm
    }
}

export default useWaitlistFormLogic;