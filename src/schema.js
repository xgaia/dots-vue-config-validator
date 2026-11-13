import { z } from "zod";

const Logo = z.strictObject({
  imgName: z.string(),
  href: z.union([z.url(), z.literal("/"), z.literal("")]).optional(),
  alt: z.string().optional(),
  maxWidth: z.string().optional(),
  order: z.number().optional(),
});

const Column = z.strictObject({
  key: z.string(),
  label: z.string().optional(),
  width: z.string().optional(),
  type: z.string().optional(),
  sortable: z.boolean().optional(),
  sortKey: z.string().optional(),
});

const Facet = z.strictObject({
  key: z.string(),
  label: z.string().optional(),
  enabled: z.boolean().optional(),
  order: z.int().optional(),
});

const BaseDotsConfig = z.strictObject({
  mediaTypeEndpoint: z.enum(["tei", "html"]).optional(),
  homePageSettings: z
    .strictObject({
      favicon: z.string().optional(),
      appNavBar: z
        .strictObject({
          collectionShortTitle: z.string().optional(),
          appNavBarLogo: Logo.optional(),
          // href is required here, unlike the shared Logo, to keep today's contract
          appNavBarApiLogo: z
            .strictObject({
              imgName: z.string(),
              href: z.union([z.url(), z.literal("/"), z.literal("")]),
              alt: z.string().optional(),
              maxWidth: z.string().optional(),
              order: z.number().optional(),
            })
            .optional(),
        })
        .optional(),
      pageHeader: z
        .strictObject({
          collectionAltTitle: z.string().optional(),
          aboutButtonText: z.union([z.string().optional(), z.literal(null)]),
          aboutOpenState: z.boolean().optional(),
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
          singleResourceButtonText: z.string().optional(),
          cardCollectionPerPage: z.int().positive().optional(),
          displaySort: z.array(z.string()).min(1).optional(),
          openState: z.boolean().optional(),
          columns: z.array(z.union([Column, z.literal(null)])).optional(),
        })
        .optional(),
    })
    .optional(),
  footerSettings: z
    .strictObject({
      footerTitle: z.string().optional(),
      footerSubtitles: z.array(z.string()).nullable().optional(),
      footerDescription: z.union([z.string().optional(), z.literal(null)]),
      footerLogos: z
        .record(z.string(), z.union([Logo, z.literal(null)]))
        .optional(),
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
  collectionCustomFonts: z.string().optional(),
  collectionCustomJs: z.string().optional(),
  searchConfig: z
    .strictObject({
      target: z.enum(["resource", "fragment"]).optional(),
      include: z
        .strictObject({
          citeTypes: z.array(z.string()).optional(),
          levels: z.array(z.int().nonnegative()).optional(),
        })
        .optional(),
      countLabel: z
        .strictObject({
          singular: z.string().optional(),
          plural: z.string().optional(),
        })
        .optional(),
      defaultSort: z.string().optional(),
      columns: z.union([z.array(Column), z.literal("listSection")]).optional(),
      facets: z.array(Facet).optional(),
      temporalFacets: z.array(Facet).optional(),
    })
    .optional(),
  renderer: z
    .strictObject({
      name: z.string().optional(),
      css: z.array(z.string()).optional(),
      documentContainer: z.string().optional(),
      pageSelectors: z.array(z.string()).optional(),
      facsimiles: z
        .array(
          z.strictObject({
            selector: z.string(),
            image: z
              .strictObject({
                selector: z.string().optional(),
                attribute: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
    })
    .optional(),
  documentPageSettings: z
    .strictObject({
      metadataTabLabel: z.string().optional(),
    })
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
      alwaysExclude: z.array(z.string()).optional(),
    })
    .optional(),
  metadataLogosMapping: z
    .array(
      z.strictObject({
        name: z.string(),
        ext: z.string().nullable(),
        dynamic: z.enum(["dots_api_base_url", "dots_vue_self"]).optional(),
      }),
    )
    .optional(),
  namespaces: z.object({}).passthrough().optional(),
});

const DotsConfig = BaseDotsConfig.extend({
  collectionId: z.string(),
});

const GenericConfig = z.object({ genericConf: BaseDotsConfig });

export { DotsConfig, GenericConfig };
