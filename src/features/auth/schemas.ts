import { z } from "zod";

const PHONE_REGEX = /^\+?\d[\d\s]{7,18}$/;

const requiredText = (message: string) => z.string().trim().min(1, message);

export const loginSchema = z.object({
  identifier: requiredText("Saisissez votre nom d’utilisateur ou votre email."),
  password: z.string().min(1, "Saisissez votre mot de passe."),
});

export const registerSchema = z.object({
  lastName: requiredText("Le nom est obligatoire."),
  firstNames: requiredText("Les prénoms sont obligatoires."),
  phone: z
    .string()
    .trim()
    .min(1, "Le téléphone est obligatoire.")
    .regex(PHONE_REGEX, "Numéro invalide (ex. +229 01 23 45 67 89)."),
  email: z.string().trim().min(1, "L’email est obligatoire.").email("Adresse email invalide."),
  profession: requiredText("La profession est obligatoire."),
  password: z
    .string()
    .min(1, "Le mot de passe est obligatoire.")
    .refine(
      (value) => value.length === 0 || (value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value)),
      "Au moins 8 caractères, avec une lettre et un chiffre.",
    ),
});

export const sessionResponseSchema = z.object({ token: z.string().min(1) });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
