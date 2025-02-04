// Main Dashboard Component
import { BalanceCard } from "./balance";
import { Layout } from "./layout";
import { Stats } from "./stats";
import { TransactionsList } from "./transaction-list";

export const HeroDashboard = () => {
    


    const dashboardData = {
      balance: 24563.00,
      growth: 2.5,
      income: 12150.00,
      expenses: 4320.00
    };
  
    return (
      <Layout>
        <div className=" flex flex-col h-screen  max-w-6xl mx-auto ">
          <BalanceCard 
            balance={dashboardData.balance} 
            growth={dashboardData.growth}
          />
          <Stats 
            income={dashboardData.income}
            expenses={dashboardData.expenses}
          />
          <TransactionsList />
        </div>
      </Layout>
    );
  };
  
  export default HeroDashboard;
