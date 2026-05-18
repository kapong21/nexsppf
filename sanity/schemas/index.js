// NEXS Sanity Studio — schema index
// Spec: NEXS_Development_Build_Plan_v5_2.docx §5 Sanity Content Models
// Drop this into a Sanity Studio (npx sanity@latest init) under /schemas
// then import { schemaTypes } from './schemas' in sanity.config.js

import page from './page.js';
import productCategory from './productCategory.js';
import product from './product.js';
import productSpec from './productSpec.js';
import faq from './faq.js';
import asset from './asset.js';
import lead from './lead.js';
import dealerApplication from './dealerApplication.js';
import warrantyRecord from './warrantyRecord.js';
import installerLocation from './installerLocation.js';
import blogPost from './blogPost.js';

export const schemaTypes = [
  page,
  productCategory,
  product,
  productSpec,
  faq,
  asset,
  lead,
  dealerApplication,
  warrantyRecord,
  installerLocation,
  blogPost,
];
