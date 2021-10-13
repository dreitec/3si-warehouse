const eligibilityClauses = {
  private_pay: ``,
  ccfa: `( INCOME_BRACKET in ('cnt_under_100_perc_fpl', 'cnt_100_199_perc_fpl', 'cnt_200_299_perc_fpl','cnt_300_399_perc_fpl' ) AND UNEMPLOYMENT = 0)`,
  dese_public_pk: `(AGE_GROUP like 'Preschool' )`,
  dese_private_pk: `(AGE_GROUP IN ('Toddler','Preschool') )`,
  dese_private_pubk: `(AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON')`,
  private_bupk: `(AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON')`,
  bupk: `(AGE_GROUP like 'Preschool' AND TOWNSHIP like 'BOSTON') `,
  head_start: `(AGE_GROUP like 'Preschool' AND INCOME_BRACKET like '%under_100%')`,
  early_head_start: `(AGE_GROUP IN ('Infant','Toddler') AND INCOME_BRACKET like '%under_100%') `,
  ccpi: `(AGE_GROUP like 'Preschool')`,
};

export default eligibilityClauses;
