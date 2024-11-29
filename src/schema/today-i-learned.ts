import { ContentSchema } from "./content";
import { TechnologySchema } from "./enums";

export const TodayILearnedSchema = ContentSchema.extend({
  technology: TechnologySchema,
});
