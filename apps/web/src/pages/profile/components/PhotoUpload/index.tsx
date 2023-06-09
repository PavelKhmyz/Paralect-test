import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { Group, Button, Stack } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconPencil, IconPlus } from '@tabler/icons-react';

import { handleError } from 'utils';
import { accountApi } from 'resources/account';

import { publicApi } from 'resources/public';
import { DataType } from 'resources/public/public.types';
import { useStyles } from './styles';

interface PhotoUploadProps {
  assetUrl: DataType | undefined;
  onUpload: Dispatch<SetStateAction<DataType | undefined>>;
}

const PhotoUpload = ({ assetUrl, onUpload }: PhotoUploadProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [asset, setAsset] = useState('');
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (assetUrl) setTimeout(() => setAsset(assetUrl.asset), 200);
  }, [assetUrl]);

  const { data: account } = accountApi.useGet();

  const { mutate: uploadAsset } = publicApi.useUploadAsset();
  const { mutate: removeAsset } = publicApi.useRemoveAsset();

  if (!account) return null;

  const isFileSizeCorrect = (file: any) => {
    const oneMBinBytes = 1048576;
    if (file.size / oneMBinBytes > 2) {
      setErrorMessage('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const isFileFormatCorrect = (file: FileWithPath) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) return true;
    setErrorMessage('Sorry, you can only upload JPG, JPEG or PNG photos.');
    return false;
  };

  const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
    setErrorMessage(null);

    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
      const body = new FormData();
      body.append('file', imageFile, imageFile.name);
      await uploadAsset(body, {
        onSuccess: (data) => onUpload(data),
        onError: (err) => handleError(err),
      });
    }
  };

  const handlerPhotoRemove = async () => {
    setErrorMessage(null);
    if (assetUrl) await removeAsset(assetUrl.asset);
  };

  return (
    <>
      <Stack w="65%" h="100%">
        <Group w="100%" h="100%" align="center" spacing={32}>
          <Stack w="100%" h="100%" align="center" spacing={10}>
            <Dropzone
              sx={
                asset
                  ? {
                      backgroundImage: `url(${asset})`,
                      backgroundRepeat: 'no-repeat',
                      height: '500px',
                      backgroundSize: 'cover',
                      border: 'none',
                    }
                  : undefined
              }
              w="100%"
              h="100%"
              name="avatarUrl"
              accept={['image/png', 'image/jpg', 'image/jpeg']}
              onDrop={handlePhotoUpload}
              classNames={{
                root: classes.dropzoneRoot,
              }}
            >
              <label
                className={cx(classes.browseButton, {
                  [classes.error]: errorMessage,
                })}
              >
                {asset ? (
                  <div className={classes.innerAvatar}>
                    <IconPencil />
                  </div>
                ) : (
                  <IconPlus size={88} className={classes.addIcon} />
                )}
              </label>
            </Dropzone>
            {account.avatarUrl && (
              <Button type="submit" variant="subtle" onClick={handlerPhotoRemove} size="sm">
                Remove
              </Button>
            )}
          </Stack>
        </Group>
      </Stack>
      {!!errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default memo(PhotoUpload);
