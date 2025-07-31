import { useModalStore } from '~/stores/modal'

export const useModal = () => {
  const modalStore = useModalStore()

  const openServiceModal = () => {
    modalStore.openServiceModal()
  }

  const openCustomModal = (data: {
    title: string
    message: string
    packages: Array<{
      id: string
      name: string
      description: string
      price: string
      buttonText: string
    }>
    disclaimer?: string
  }) => {
    modalStore.openCustomModal(data)
  }

  const closeModal = () => {
    modalStore.closeModal()
  }

  const handlePackageClick = (packageId: string) => {
    modalStore.handlePackageClick(packageId)
  }

  return {
    isOpen: computed(() => modalStore.isOpen),
    openServiceModal,
    openCustomModal,
    closeModal,
    handlePackageClick
  }
} 