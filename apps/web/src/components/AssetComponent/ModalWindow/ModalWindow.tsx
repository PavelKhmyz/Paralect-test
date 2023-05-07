/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Group, Stack, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { publicApi } from 'resources/public';
import { DataType } from 'resources/public/public.types';

interface ModalWindowProps {
  data: DataType;
  owner: string;
  onClose: () => void;
}

export const ModalWindow = ({ data, owner, onClose }: ModalWindowProps) => {
  const { mutate: updateAsset } = publicApi.useUpdateAsset();

  const likeCheck = () => {
    if (data.like[1].find((e) => e === owner)) {
      return 'like';
    }
    if (data.dislike[1].find((e) => e === owner)) {
      return 'dislike';
    }
    return '';
  };

  const [status, setStatus] = useState(data);
  const [grade, setGrade] = useState(likeCheck());

  const handlePublicate = () => {
    setStatus((prev) => ({ ...prev, public: true }));
  };
  const handleRemove = () => {
    setStatus((prev) => ({ ...prev, public: false }));
  };
  const handleClose = () => {
    if (owner !== 'forbiden') {
      updateAsset(status);
    }
    onClose();
  };
  const handleGrade = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = (e.target as HTMLElement).id;
    if (button === grade) {
      setGrade('');
      if (button === 'like') {
        setStatus((prev) => ({
          ...prev,
          like: [status.like[0] - 1, status.like[1].filter((el) => el !== owner)],
        }));
      } else {
        setStatus((prev) => ({
          ...prev,
          dislike: [status.dislike[0] - 1, status.dislike[1].filter((el) => el !== owner)],
        }));
      }
    }
    if (button !== grade) {
      setGrade(button);
      if (button === 'like' && grade === 'dislike') {
        setStatus((prev) => ({
          ...prev,
          like: [status.like[0] + 1, [...status.like[1], owner]],
          dislike: [status.dislike[0] - 1, status.dislike[1].filter((el) => el !== owner)],
        }));
      }
      if (button === 'dislike' && grade === 'like') {
        setStatus((prev) => ({
          ...prev,
          like: [status.like[0] - 1, status.like[1].filter((el) => el !== owner)],
          dislike: [status.dislike[0] + 1, [...status.dislike[1], owner]],
        }));
      }
      if (button === 'like' && grade === '') {
        setStatus((prev) => ({
          ...prev,
          like: [status.like[0] + 1, [...status.like[1], owner]],
        }));
      }
      if (button === 'dislike' && grade === '') {
        setStatus((prev) => ({
          ...prev,
          dislike: [status.dislike[0] + 1, [...status.dislike[1], owner]],
        }));
      }
    }
  };

  const variables = () => {
    if (status.public && data.owner === owner) {
      return (
        <Button type="button" onClick={handleRemove}>
          DELETE FROM PUBLIC GALLERY
        </Button>
      );
    }
    if (!status.public && data.owner === owner) {
      return (
        <Button type="button" onClick={handlePublicate}>
          MAKE PUBLIC
        </Button>
      );
    }
    return null;
  };
  return (
    <div
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
      onClick={handleClose}
    >
      <Group
        onClick={(e) => e.stopPropagation()}
        spacing={20}
        w="90%"
        maw="1400px"
        h="70vh"
        p={20}
        position="apart"
        sx={{ border: '1px solid black', backgroundColor: 'grey' }}
      >
        <Group w="65%" h="100%" sx={{ overflow: 'hidden' }}>
          <img src={data.asset} alt={data.name} />
        </Group>
        <Stack w="30%" h="100%">
          <h1>{data.name}</h1>
          <p>{data.author}</p>
          <p>{data.discription}</p>
          <UnstyledButton
            sx={grade === 'like' ? { backgroundColor: 'red' } : { backgroundColor: 'white' }}
            id="like"
            onClick={(e) => {
              handleGrade(e);
            }}
          >
            {`LIKE: ${status.like[0]}`}
          </UnstyledButton>
          <UnstyledButton
            sx={grade === 'dislike' ? { backgroundColor: 'red' } : { backgroundColor: 'white' }}
            id="dislike"
            onClick={(e) => {
              handleGrade(e);
            }}
          >
            {`DISLIKE: ${status.dislike[0]}`}
          </UnstyledButton>
          {variables()}
        </Stack>
      </Group>
    </div>
  );
};
