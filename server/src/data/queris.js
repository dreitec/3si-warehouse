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

const eligibilityWithPrograms = `
select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			where (month >= ${month} AND year >= ${lastYear}) OR ( year = ${currentYear})
            AND (
                (AGE_GROUP IN ('Infant','Toddler','Preschool', 'School Age') AND INCOME_BRACKET like '%_399%' AND UNEMPLOYMENT = 0) OR
                (AGE_GROUP like 'Preschool' ) OR 
                (AGE_GROUP IN ('Toddler','Preschool') ) OR
                (AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON') OR
                (AGE_GROUP like 'Preschool' AND TOWNSHIP like 'BOSTON') OR
                (AGE_GROUP like 'Preschool' AND INCOME_BRACKET like '%under_100%') OR
                (AGE_GROUP IN ('Infant','Toddler') AND INCOME_BRACKET like '%under_100%') OR
                (AGE_GROUP like 'Preschool')
            )		
			group by month, LOAD_DT
			order by LOAD_DT;`;
