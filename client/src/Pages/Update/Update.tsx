import { FC, useCallback, useEffect, useState } from 'react';
import AgGrid from '@Components/AgGrid/AgGrid';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useUser } from '@ApiService/Requests/useUser';
import { Columns, ColumnsDefs, FieldImage, Page, PageData, rowType } from '@/types/agGrid.model';
import { useCRUD } from '@/hooks/useData/useData';
import { useUsers } from '@/hooks/react-query/useUsers';
import { getColumnsDefs } from '@/components/AgGrid/columnsDefs';
import { Environment } from '@/types/environment.model';
import { Dashboard } from '@/types/dashboards.model';

const Update: FC = () => {
  const { user } = useUser();
  if (!user) return <></>;

  const queryClient = useQueryClient();
  const location = useLocation();

  const page: Page = location.pathname.slice(location.pathname.lastIndexOf('/') + 1) as Page;

  const [rowsData, setRowsData] = useState<rowType[]>([]);
  const [columnsDefs, setColumnsDefs] = useState<Columns[]>([]);

  const { getData } = useCRUD();
  const { data: environments } = getData<Environment>({
    path: 'environments',
    params: '?sort=name',
  });

  const { data: dashboards } = getData<Dashboard>({
    path: 'dashboardsNew',
    params: '?sort=order',
    options: { enabled: !!environments },
  });

  const { users } = useUsers({});

  const queryKeys = {
    dashboardsNew: ['dashboardsNew', '?sort=order'],
    environments: ['environments', '?sort=name'],
    users: ['users', ''],
  };
  const queryKey = queryKeys[page as keyof typeof queryKeys];

  const refetchData = () => {
    if (page === 'dashboardsNew') {
      queryClient.invalidateQueries({
        queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: ['environments', '?sort=name'],
      });
    } else {
      queryClient.invalidateQueries({
        queryKey,
      });
    }
  };

  const fieldImage: FieldImage = {
    dashboardsNew: '',
    environments: 'logo',
    users: 'photo',
  };

  const changePageData = useCallback(({ rowsData, columnsDefs }: PageData) => {
    // get the correct columns definition
    columnsDefs = getColumnsDefs(columnsDefs as ColumnsDefs) as Columns[];
    // set the state of rowsData and columnsDefs
    setColumnsDefs(columnsDefs);
    // deep cloned data prevents unwanted changes in React-Query cache
    const clonedData = structuredClone(rowsData);
    setRowsData(clonedData);
  }, []);

  useEffect(() => {
    switch (page) {
      case 'dashboardsNew':
        if (!environments || !dashboards) return;
        changePageData({
          rowsData: dashboards,
          columnsDefs: {
            page,
            environments,
          },
        });
        break;

      case 'environments':
        if (!environments) return;
        changePageData({
          rowsData: environments,
          columnsDefs: {
            page,
            environments,
          },
        });
        break;

      case 'users':
        if (!users) return;
        changePageData({
          rowsData: users,
          columnsDefs: {
            page,
            users,
          },
        });
        break;

      default:
        break;
    }
  }, [page, dashboards, environments, users, changePageData]);

  const objData = {
    queryKey,
    page,
    environments,
    columnsDefs,
    rowsData,
    setRowsData,
    refetchData,
    fieldImage,
  };

  return <AgGrid objData={objData} />;
};

export default Update;
