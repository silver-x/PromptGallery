"use client"

import { Toaster as ChakraToaster, Portal, Spinner, Stack, Toast } from "@chakra-ui/react"
import { createToaster } from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-right",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ base: "4", md: "auto" }}>
        {(toast) => (
          <Toast.Root>
            {toast.type === "loading" && <Spinner size="sm" color="blue.solid" />}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}

export { Toast }