import { config, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { json, password, text } from "@keystone-6/core/fields";

export default config({
  db: { provider: "sqlite", url: "file:./keystone.db" },
  lists: {
    User: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
        password: password(),
      },
      access: allowAll,
    }),
    Resume: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        title: text({ validation: { isRequired: true } }),
        contact: json(),
        summary: text({ ui: { displayMode: "textarea" } }),
        skills: json(),
        experience: json(),
      },
      access: allowAll,
    }),
  },
});
