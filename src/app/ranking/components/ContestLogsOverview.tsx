import React, { useState } from 'react'
import { ContestLog, RankingRegistrationOverview } from '../interfaces'
import EditLogFormModal from './modals/EditLogFormModal'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { User } from '../../session/interfaces'
import RankingApi from '../api'
import ContestLogsTable from './ContestLogsTable'
import ContestLogsList from './ContestLogsList'
import { Contest } from '../../contest/interfaces'
import { isContestActive } from '../domain'
import styled from 'styled-components'
import { PageTitle } from '../../ui/components'

interface Props {
  logs: ContestLog[]
  registration: RankingRegistrationOverview
  contest: Contest
  signedInUser?: User | undefined
  refreshData: () => void
}

const ContestLogsOverview = (props: Props) => {
  const signedInUser = useSelector((state: RootState) => state.session.user)
  const [selectedLog, setSelectedLog] = useState(
    undefined as ContestLog | undefined,
  )

  const finishUpdate = () => {
    props.refreshData()
    setSelectedLog(undefined)
  }

  const deleteLog = (log: ContestLog) => {
    const shouldDelete = confirm('Are you sure you want to delete this?')

    if (!shouldDelete) {
      return
    }

    RankingApi.deleteLog(log.id)
    props.refreshData()
  }

  const isOwner = signedInUser && signedInUser.id === props.registration.userId
  const canEdit = (isOwner && isContestActive(props.contest)) || false

  return (
    <>
      <Heading>Updates</Heading>
      <EditLogFormModal
        log={selectedLog}
        setLog={setSelectedLog}
        onSuccess={finishUpdate}
        onCancel={() => setSelectedLog(undefined)}
      />
      <ContestLogsTable
        logs={props.logs}
        canEdit={canEdit}
        editLog={setSelectedLog}
        deleteLog={deleteLog}
      />
      <ContestLogsList
        logs={props.logs}
        canEdit={canEdit}
        editLog={setSelectedLog}
        deleteLog={deleteLog}
      />
    </>
  )
}

export default ContestLogsOverview

const Heading = styled(PageTitle).attrs({ as: 'h3' })`
  margin: 60px 0 30px;
  font-size: 22px;
`
