import { Button, Group, Stack, TextInput, Textarea } from '@mantine/core';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { publicApi } from 'resources/public';
import { DataType } from 'resources/public/public.types';
import PhotoUpload from '../PhotoUpload';

interface UploadPictureProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}
interface AssetObjType {
  asset: string;
  author: string;
  discription: string;
  dislike: [number, string[]];
  like: [number, string[]];
  name: string;
  owner: string;
  public: boolean;
}

export const UploadPicture = ({ onClose }: UploadPictureProps) => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [discription, setDiscription] = useState('');
  const [picture, setPicture] = useState<DataType>();

  const { mutate: updateAsset } = publicApi.useUpdateAsset();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };
  const handleChangeDiscription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDiscription(event.target.value);
  };
  const handleClose = () => {
    onClose((prev) => !prev);
  };

  // TODO: добавить валидатор заполнения формы
  const onSubmit = () => {
    if (picture) {
      const newAsset: AssetObjType = {
        name,
        author,
        discription,
        asset: picture.asset,
        public: false,
        like: [0, []],
        dislike: [0, []],
        owner: '',
      };
      updateAsset(newAsset, {
        onError: (err) => console.log(err),
      });
    }
    handleClose();
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={(e) => e.currentTarget === e.target && handleClose()}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form style={{ width: '90%', maxWidth: '1400px' }}>
        <Group
          spacing={20}
          w="100%"
          h="70vh"
          p={20}
          position="apart"
          sx={{ border: '1px solid black', backgroundColor: 'grey' }}
        >
          <PhotoUpload assetUrl={picture} onUpload={setPicture} />
          <Stack w="30%" h="100%">
            <TextInput
              value={name}
              onChange={handleChangeName}
              label="Name"
              placeholder="Name of your picture"
            />
            <TextInput
              value={author}
              onChange={handleChangeAuthor}
              label="Author"
              placeholder="Author name"
            />
            <Textarea
              value={discription}
              size="xl"
              autosize
              minRows={2}
              maxRows={10}
              onChange={handleChangeDiscription}
              placeholder="Discription"
              label="Discription"
            />
            <Button type="button" onClick={onSubmit}>
              Upload your picture!
            </Button>
          </Stack>
        </Group>
      </form>
    </div>
  );
};
