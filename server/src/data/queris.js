const GetLastYearData = `
select  
DATE(LOAD_DT) as date, 
MONTH(date) as month, 
YEAR(date) as year,
count(CHILD_ID) as children 
from CHILDREN
where month  >= 1 and year >= 2021
group by month, LOAD_DT
order by LOAD_DT;`;
