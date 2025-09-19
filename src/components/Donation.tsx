import type { ButtonGroup } from '@/types/button-group';
import copyToClipboard from '@/utils/copyToClipboard';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@heroui/react';
import {
  IconBrandGithub,
  IconCoinMonero,
  IconMoneybag,
} from '@tabler/icons-react';
import { createElement } from 'react';

const paymentMethods: ButtonGroup = [
  {
    title: 'GitHub Sponsors',
    content: 'https://github.com/sponsors/baxthus',
    icon: IconBrandGithub,
  },
  {
    title: 'Monero',
    content:
      '4A3AaKgLGjcMJTPn3HctKyVq5bev72YV3D6bnS7MLJD5cDgonEf7HThjRS4D81ZwhUeN7tw8tZjawFYzj9aRSjahVTzp9FD',
    icon: IconCoinMonero,
    copy: true,
  },
];

export default function Donation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Support Me">
        <Button variant="light" isIconOnly onPress={onOpen}>
          <IconMoneybag size={32} />
        </Button>
      </Tooltip>
      <Modal
        size="xs"
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader>Support Me</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-4">
                {paymentMethods.map(({ title, content, icon, copy }) => (
                  <Button
                    key={title}
                    as={copy ? 'button' : 'a'}
                    href={content}
                    target={'_blank'}
                    color="secondary"
                    variant="shadow"
                    className="w-full"
                    startContent={createElement(icon, { stroke: 1.5 })}
                    onPress={() =>
                      copy && content && copyToClipboard(content, 'Thank you!')
                    }
                  >
                    {title}
                  </Button>
                ))}
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
