import './Dashboard.scss';
import Widget from '@Components/Widget';
import Chart from '@Components/Chart';
import { PersonOutline, Dashboard as DashboardIcon, People, Diversity3 } from '@mui/icons-material';
import { useCustomers } from '@hooks/react-query/useCustomers';
import { useCustomersTypes } from '@hooks/react-query/useCustomersTypes';
import { useDashboards } from '@hooks/react-query/useDashboards';
import { useUsers } from '@hooks/react-query/useUsers';

const Dashboard = () => {
  const { customers } = useCustomers({});
  const { customersTypes } = useCustomersTypes({});
  const { dashboards } = useDashboards({});
  const { users } = useUsers({});

  return (
    <>
      <div className='widgets'>
        <Widget
          title='לקוחות'
          linkTitle='צפה בכל הלקוחות'
          path='update/customers'
          count={customers?.length || 0}
          icon={PersonOutline}
          style={{ color: 'green', backgroundColor: 'rgba(0,128,0,0.2)' }}
        />
        {users && (
          <Widget
            title='משתמשים'
            linkTitle='צפה בכל המשתמשים'
            path='update/users'
            count={users?.length || 0}
            icon={People}
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255,0,0,0.2)',
            }}
          />
        )}

        <Widget
          title='סוגי משתמשים'
          linkTitle='צפה בכל סוגי המשתמשים'
          path='update/types'
          count={customersTypes?.length || 0}
          icon={Diversity3}
          style={{ color: 'green', backgroundColor: 'rgba(0,128,0,0.2)' }}
        />
      </div>

      <div className='charts'>
        <Chart />
        <Widget
          title='דשבורדים'
          linkTitle='צפה בכל הדשבורדים'
          path='update/dashboards'
          count={dashboards?.length || 0}
          icon={DashboardIcon}
          style={{
            color: 'var(--shual)',
            backgroundColor: 'rgb(0,171,255,0.3)',
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
