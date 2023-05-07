import { NextPage } from 'next';
import { accountApi } from 'resources/account';
import { publicApi } from 'resources/public';
import { DataType } from 'resources/public/public.types';
import { AssetComponent } from 'components';

const Home: NextPage = () => {
  const { data } = publicApi.useGallery();
  const { data: account } = accountApi.useGet();

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        margin: '0 auto',
      }}
    >
      {data &&
        data.results.map((asset: DataType) => (
          <AssetComponent
            key={`${asset.name}${Math.random()}`}
            owner={account ? account._id : 'forbiden'}
            count={asset}
          />
        ))}
    </div>
  );
};

export default Home;
