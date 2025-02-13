// Main Dashboard Component
import { BalanceCard } from "./balance";
import { Layout } from "./layout";
import { TransactionsList } from "./transactionList";

export const HeroDashboard = () => {
    


    const dashboardData = {
      balance: 24563.00,
      growth: 2.5,
      income: 12150.00,
      expenses: 4320.00
    };
  
    return (
      <Layout >
        <div className=" flex flex-col h-screen  max-w-6xl  mx-auto ">

        <hr className="border-gray-300 my-6 mt-1" />

          <BalanceCard 
              balance={dashboardData.balance}
              growth={dashboardData.growth}
          />
          {/* <Stats 
            income={dashboardData.income}
           
          /> */}
          <TransactionsList />
        </div>
      </Layout>
    );
  };
  
  export default HeroDashboard;
