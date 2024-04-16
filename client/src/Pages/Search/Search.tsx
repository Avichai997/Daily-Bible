import './Search.scss';
import React, { useEffect } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Box, TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import CardEnvironment from '@/components/CardEnvironment';
import RtlProvider from '@/utils/RtlProvider';
import { useEnvironments } from '@/hooks/react-query/useEnvironments';
import { Environment, EnvironmentCard } from '@/types/environment.model';

const Search = () => {
  const { environments } = useEnvironments({ params: '?envUrl[exists]=true' });
  const { ref, inView } = useInView();

  const fetchEnvironment = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/environments?page=${pageParam}&limit=30`
    );
    const { results, data } = await response.json();

    return { response: data, next: pageParam + 1, totalPages: results };
  };
  const { status, data, fetchNextPage } = useInfiniteQuery(['environments'], fetchEnvironment, {
    getNextPageParam: (lastPage) => lastPage.next,
  });

  useEffect(() => {
    // when screen reach <div ref={ref} /> ref set inView=true
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const envOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    { logo, envUrl, name }: Environment
  ) => {
    const envLogo =
      logo === 'defaultEnvironmentLogo.jpg' ? `${import.meta.env.VITE_API_URL}/img/${logo}` : logo;

    return (
      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        <a href={envUrl} target='_blank' rel='noreferrer'>
          <img loading='lazy' width='30' src={envLogo} alt='' style={{ marginLeft: 8 }} />
          {name}
        </a>
      </Box>
    );
  };

  return (
    <>
      <div className='mainPage'>תמ"צ קורונה לרשויות</div>
      <div className='searchField'>
        {environments && (
          <RtlProvider>
            <Autocomplete
              sx={{
                width: 500,
              }}
              className='inputRounded'
              options={environments}
              getOptionLabel={(option: Environment) => option.name}
              renderOption={(props, option) => envOption(props, option)}
              renderInput={(params) => (
                <TextField
                  className='inputRounded'
                  variant='outlined'
                  {...params}
                  placeholder='בחר סביבה למעבר לדשבורדים שלה'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </RtlProvider>
        )}
      </div>

      {/* //====================Cards=====================// */}
      <div className='mainCard'>
        <div className='dataCard'>
          {status === 'loading' ? (
            <p>טוען עוד סביבות שוע"ל...</p>
          ) : status === 'error' ? (
            <span>שגיאה: error.message</span>
          ) : (
            <>
              {data?.pages.map((c) => {
                return c.response.map(({ name, logo, envUrl }: EnvironmentCard) => {
                  return (
                    <CardEnvironment
                      key={name}
                      name={name}
                      envUrl={envUrl}
                      logo={
                        logo === 'defaultEnvironmentLogo.jpg'
                          ? `${import.meta.env.VITE_API_URL}/img/${logo}`
                          : logo
                      }
                    />
                  );
                });
              })}
            </>
          )}
        </div>
      </div>

      {/* the load more div */}
      <div ref={ref}>Loading...</div>
    </>
  );
};

export default Search;
