/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { DataType } from 'resources/public/public.types';
import { ModalWindow } from './ModalWindow/ModalWindow';

interface AssetComponentProps {
  count: DataType;
  owner: string;
}

const AssetComponent = ({ count, owner }: AssetComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <img
        onClick={handleShowModal}
        src={count.asset}
        alt="Something goes wrong"
        style={{ width: '200px', height: '200px', backgroundColor: 'grey', cursor: 'pointer' }}
      />
      {showModal && <ModalWindow owner={owner} data={count} onClose={handleShowModal} />}
    </>
  );
};

export default AssetComponent;
