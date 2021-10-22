export const eligibilityClauses = {
  ccfa: `(AGE_GROUP not like 'School Age' AND  INCOME_BRACKET in ('cnt_under_100_perc_fpl', 'cnt_100_199_perc_fpl', 'cnt_200_299_perc_fpl','cnt_300_399_perc_fpl' ) AND UNEMPLOYMENT = 0)`,
  ccfasa: `(AGE_GROUP like 'School Age' AND  INCOME_BRACKET in ('cnt_under_100_perc_fpl', 'cnt_100_199_perc_fpl', 'cnt_200_299_perc_fpl','cnt_300_399_perc_fpl' ) AND UNEMPLOYMENT = 0)`,
  dese_public_pk: `(AGE_GROUP like 'Preschool' )`,
  dese_private_pk: `(AGE_GROUP IN ('Toddler','Preschool') )`,
  dese_private_pubk: `(AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON')`,
  private_bupk: `(AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON')`,
  bupk: `(AGE_GROUP like 'Preschool' AND TOWNSHIP like 'BOSTON') `,
  head_start: `(AGE_GROUP like 'Preschool' AND INCOME_BRACKET like '%under_100%')`,
  early_head_start: `(AGE_GROUP IN ('Infant','Toddler') AND INCOME_BRACKET like '%under_100%') `,
  cppi: `(AGE_GROUP like 'Preschool')`,
};

export const ServedClauses = {
  ccfa: `(PROGRAM_NAME like 'ccfa' AND AGE_GROUP not like 'School Age')`,
  ccfasa: `(PROGRAM_NAME like 'dese_private_pk')`,
  dese_public_pk: `PROGRAM_NAME like 'dese_public_pk'`,
  dese_private_pk: `(PROGRAM_NAME like 'dese_private_pubk')`,
  dese_private_pubk: `(AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON')`,
  private_bupk: `(PROGRAM_NAME like 'private_bupk')`,
  bupk: `(PROGRAM_NAME like 'bupk')`,
  head_start: `(PROGRAM_NAME like 'head_start')`,
  early_head_start: `(PROGRAM_NAME like 'early_head_start')`,
  cppi: `(PROGRAM_NAME like 'cppi')`,
};

export const CommonClauses = {
  cnt_under_100_perc_fpl: `(INCOME_BRACKET like 'cnt_under_100_perc_fpl')`,
  cnt_100_199_perc_fpl: `(INCOME_BRACKET like 'cnt_100_199_perc_fpl')`,
  cnt_200_299_perc_fpl: `(INCOME_BRACKET like 'cnt_200_299_perc_fpl')`,
  cnt_300_399_perc_fpl: `(INCOME_BRACKET like 'cnt_300_399_perc_fpl')`,
  cnt_400_499_perc_fpl: `(INCOME_BRACKET like 'cnt_400_499_perc_fpl')`,
  cnt_gte_500_perc_fpl: `(INCOME_BRACKET like 'cnt_gte_500_perc_fpl')`,
  infant: `(AGE_GROUP like 'Infant')`,
  toddler: `(AGE_GROUP like 'Toddler')`,
  preschool: `(AGE_GROUP like 'Preschool')`,
  school_age: `(AGE_GROUP like 'School Age')`,
  adilf: `(UNEMPLOYMENT = 0)`,
  nadilf: `(UNEMPLOYMENT = 1)`,
};
