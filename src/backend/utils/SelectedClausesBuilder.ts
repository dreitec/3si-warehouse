interface Clauses {
  [key: string]: string;
}
const MakeQueryArray = (
  query: any,
  clauses: Clauses,
  checkPrivatePay: boolean = true
): string[] => {
  const selectedClauses: string[] = [];
  if (query.filter) {
    if (checkPrivatePay && query.filter.includes("private_pay")) {
      return [];
    }
    query.filter.forEach((filter: string) => {
      if (filter === "bupk") {
        const bupkKeys = Object.keys(clauses).filter((key: string) =>
          key.includes("bupk")
        );

        bupkKeys.forEach((bupkKey: string) => {
          const condition: string | undefined = clauses[filter];
          if (condition) selectedClauses.push(condition);
        });
      }
      if (clauses[filter]) {
        selectedClauses.push(clauses[filter]);
      }
    });
  }
  return selectedClauses;
};

export default MakeQueryArray;
