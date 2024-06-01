import React, { useEffect, useState } from 'react';
import '../../index.css'; 
import useFetch from '../../hooks/useFetch';

const CompanyList = ({ coinName }) => {
  const [companyData, setCompanyData] = useState([]);
  const { data } = useFetch(`/companies/public_treasury/${coinName}`);

  useEffect(() => {
    if (data) {
      setCompanyData(data);
    }
  }, [data, companyData]);

  // if (!companyData.length) {
  //   return <div>Loading...</div>;
  // }

  // console.log(companyData)

  return (
    <div className="flex flex-wrap justify-center gap-3 p-6 mb-6 rounded-lg ">
      {/* manis is thi */}
      {companyData?.companies?.slice(0,5).map((company, index) => (
        <div key={index} className="p-4 mb-4 bg-[#326eb32d] hover:cursor-pointer  shadow rounded-lg  transition-all hover:scale-95">
          <div className="flex items-center mb-4">
            <div className="text-lg font-bold text-white border-b-2 border-gray-700">{company.name}</div>
            <div className="ml-2 text-sm text-gray-600">{company.symbol}</div>
          </div>
          <div className="mb-2 text-gray-300"><b className='text-gray-600'>Country:</b>    &nbsp;&nbsp;&nbsp; {company.country}</div>
          <div className="mb-2 text-gray-300"><b className='text-gray-600'>Total Holdings: </b>    &nbsp;&nbsp;&nbsp;{company.total_holdings.toLocaleString()}</div>
          <div className="mb-2 text-gray-300"><b className='text-gray-600'>Total Entry Value (USD): </b>    &nbsp;&nbsp;&nbsp;${company.total_entry_value_usd.toLocaleString()}</div>
          <div className="mb-2 text-gray-300"><b className='text-gray-600'>Total Current Value (USD): </b>    &nbsp;&nbsp;&nbsp;${company.total_current_value_usd.toLocaleString()}</div>
          <div className="mb-2 text-gray-300"><b className='text-gray-600'>Percentage of Total Supply: </b>    &nbsp;&nbsp;&nbsp;{company.percentage_of_total_supply}%</div>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
