import { z } from "zod";

const BaseDotsConfig = z.strictObject({
  mediaTypeEndpoint: z.string().optional(),
  homePageSettings: z
    .strictObject({
      favicon: z.string().optional(),
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
          collectionBannerImg: z.string().optional(),
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
            z.literal(null),
            z.literal(""),
          ]),
        })
        .optional(),
      listSection: z
        .strictObject({
          displayMode: z.enum(["list", "card", "", "mixed", "toc"]).optional(),
          logo: z.string(/*XXX: cutsomFormat*/).optional(),
          browseButtonText: z.string().optional(),
          cardCollectionPerPage: z.int().positive().optional(),
          displaySort: z.array(z.string()).min(1).optional(),
          openState: z.boolean().optional(),
          columns: z
            .array(
              z.union([
                z.strictObject({
                  key: z.string(),
                  label: z.string(),
                  width: z.string().optional(),
                  type: z.string().optional(),
                }),
                z.literal(null),
              ]),
            )
            .optional(),
        })
        .optional(),
    })
    .optional(),
  footerSettings: z.strictObject({
    footerTitle: z.string().optional(),
    footerSubtitles: z.union([z.array(z.string()).optional(), z.literal(null)]),
    footerDescription: z.string().optional(),
  }),
  tableOfContentsSettings: z
    .strictObject({
      tableOfContentDepth: z.int().positive().optional(),
      editByLevel: z.int().gte(0).nullable().optional(),
      editByCiteType: z.array(z.string()).nullable().optional(),
      countByCiteType: z.array(z.string()).optional(),
      displayTopToc: z.boolean().optional(),
      displayLeftToc: z.boolean().optional(),
      leftTocFragmentIsDocument: z.boolean().optional(),
    })
    .optional(),
  collectionCustomCss: z
    .union([z.literal(false), z.string(/*XXX: customFormat*/)])
    .optional(),
  excludeCollectionIds: z.array(z.string()).optional(),
  aboutPageSettings: z
    .array(
      z.union([
        z.strictObject({
          tabName: z.string(),
          compName: z.string(),
        }),
        z.literal(null),
      ]),
    )
    .optional(),
  customRoutes: z
    .array(
      z.strictObject({
        name: z.string(),
        path: z.string(),
        compName: z.string(),
      }),
    )
    .optional(),
  topBreadcrumbButtonLabel: z.array(z.string()).optional(),
  metadataDisplayOrder: z.array(z.string()).optional(),
  metadataRename: z.object({}).passthrough().optional(),
  excludeMetadata: z
    .strictObject({
      onlyDeclared: z.boolean().optional(),
      fields: z.array(z.string()).optional(),
    })
    .optional(),
  namespaces: z.object({}).passthrough().optional(),
});

const DotsConfig = BaseDotsConfig.extend({
  collectionId: z.string(),
});

const GenericConfig = z.object({ genericConf: BaseDotsConfig });

export { DotsConfig, GenericConfig };
