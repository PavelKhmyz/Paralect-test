import Head from 'next/head';
import { NextPage } from 'next';
import { Stack, Title, Group, UnstyledButton } from '@mantine/core';
import { accountApi } from 'resources/account';

import { useState } from 'react';
import { DataType } from 'resources/public/public.types';
import { AssetComponent } from 'components';
import { IconPlus } from '@tabler/icons-react';
import { publicApi } from 'resources/public';
import { useStyles } from './components/PhotoUpload/styles';
import { UploadPicture } from './components/UploadPicture/UploadPicture';

const Profile: NextPage = () => {
  const [isShownForm, setIsShownForm] = useState(false);
  const { classes } = useStyles();
  const { data: account } = accountApi.useGet();

  const { data } = publicApi.usePrivateGallery(account ? account._id : '');

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Stack sx={{ width: '100%', margin: 'auto', paddingTop: '48px' }} spacing={32}>
        <Title order={1}>User gallery</Title>
        <Group>
          {data &&
            data.results.map((element: DataType) => (
              <AssetComponent
                key={`${element.name}${Math.random()}`}
                owner={account ? account._id : 'forbiden'}
                count={element}
              />
            ))}
          <UnstyledButton type="button" onClick={() => setIsShownForm((prev) => !prev)}>
            <div className={classes.addButton}>
              <IconPlus size={50} className={classes.plusIcon} />
            </div>
          </UnstyledButton>
        </Group>
      </Stack>
      {isShownForm && <UploadPicture onClose={setIsShownForm} />}
    </>
  );
};

export default Profile;
