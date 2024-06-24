'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type User, createUserStore } from '@/stores/user-store'

export type UserStoreApi = ReturnType<typeof createUserStore>

export const UserUserContext = createContext<UserStoreApi | undefined>(
  undefined,
)

export interface UserStoreProviderProps {
  children: ReactNode
}

export const UserStoreProvider = ({
  children,
}: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createUserStore()
  }

  return (
    <UserUserContext.Provider value={storeRef.current}>
      {children}
    </UserUserContext.Provider>
  )
}

export const useUserStore = <T,>(
  selector: (store: User) => T,
): T => {
  const userStoreContext = useContext(UserUserContext)

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`)
  }

  return useStore(userStoreContext, selector)
}