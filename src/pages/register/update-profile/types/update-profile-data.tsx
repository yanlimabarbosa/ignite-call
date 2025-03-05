import { z } from "zod";
import { updateProfileFormSchema } from "../schemas/update-profile-form-schema";

export type UpdateProfileData = z.infer<typeof updateProfileFormSchema>
