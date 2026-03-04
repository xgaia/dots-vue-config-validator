import { z } from "zod";

const BaseDotsConfig = z.strictObject({
  mediaTypeEndpoint: z.string().optional(),
  homePageSettings: z
    .strictObject({
      appNavBar: z
        .strictObject({
          collectionShortTitle: z.string().optional(),
          appNavBarLogo: z
            .strictObject({
              imgName: z.string(/*XXX: customFormat*/) /*XXX:optional?*/,
              href: z.union([z.url(), z.literal("/")]).optional(),
            })
            .optional(),
          appNavBarApiLogo: z
            .strictObject({
              imgName: z.string(/*XXX: customFormat*/) /*XXX:optional?*/,
              href: z.union([z.url(), z.literal("/")]) /*XXX:optional?*/,
            })
            .optional(),
        })
        .optional(),
      pageHeader: z
        .strictObject({
          collectionAltTitle: z.string().optional(),
          aboutButtonText: z.union([z.string().optional(), z.literal(null)]),
        })
        .optional(),
      descriptionSection: z
        .strictObject({
          collectionDescription: z.string().optional(),
          customCollectionDescription: z.union([
            z
              .strictObject({
                compName: z.string().optional() /*XXX: use customFormat*/,
              })
              .optional(),
            z.literal(null) /*XXX: null or empty string?*/,
          ]),
        })
        .optional(),
      listSection: z
        .strictObject({
          displayMode: z
            .enum(["list", "card", "" /*XXX: allow empty string?*/])
            .optional(),
          logo: z.string(/*XXX: cutsomFormat*/).optional(),
          browseButtonText: z.string().optional(),
          cardCollectionPerPage: z.int().positive().optional(),
          displaySort: z.array(z.string()).min(1).optional(),
          openState: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
  footerSettings: z.strictObject({
    footerTitle: z.string().optional(),
    footerSubtitles: z
      .array(z.string()) /*XXX: max? min? empty list?*/
      .optional() /*XXX: allow string? allow null?*/,
    footerDescription: z.string().optional(),
  }),
  tableOfContentsSettings: z
    .strictObject({
      tableOfContentDepth: z.int().positive().optional(),
      editByLevel: z.int().gte(0).optional(),
      editByCiteType: z.array(z.string()).optional(),
      countByCiteType: z.array(z.string()).optional(),
      displayTopToc: z.boolean().optional(),
      displayLeftToc: z.boolean().optional(),
      leftTocFragmentIsDocument: z.boolean().optional(),
    })
    .optional(),
  collectionCustomCss: z
    .union([z.literal(false), z.string(/*XXX: customFormat*/)])
    .optional() /*XXX: optional?*/,
  excludeCollectionIds: z.array(z.string()).optional(),
  aboutPageSettings: z
    .array(
      z.union([
        z.strictObject({
          tabName: z.string(),
          compName: z.string(/*XXX: custom*/),
        }),
        z.literal(null),
      ]),
    )
    .min(1) /*min1?*/
    .optional(),
});

const DotsConfig = BaseDotsConfig.extend({
  collectionId: z.string(),
});

const GenericConfig = z.object({ genericConf: BaseDotsConfig });

export { DotsConfig, GenericConfig };
