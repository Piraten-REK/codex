import { User } from '@/db'
import { Gender } from '@prisma/client'
import { FC } from 'react'
import { GenderFemale, GenderMale, GenderAmbiguous } from 'react-bootstrap-icons'

const genderIconMap: Record<Gender, JSX.Element> = {
  FEMALE: <GenderFemale />,
  MALE: <GenderMale />,
  OTHER: <GenderAmbiguous />
}

export interface UsersProps {
  initialActiveUsers: User[]
  initialInactiveUsers: User[]
  activeUsersCount: number
  inactiveUsersCount: number
}

const Users: FC<UsersProps> = ({ initialActiveUsers, initialInactiveUsers, activeUsersCount, inactiveUsersCount }) => (
  <>
    <table role='table'>
      <caption role='caption'>Aktive Benutzer</caption>
      <thead role='rowgroup'>
        <tr role='row'>
          <th role='columnheader'>Name</th>
          <th role='columnheader'>Gender</th>
          <th role='columnheader'>Nutzername</th>
          <th role='columnheader'>E-Mail</th>
          <th role='columnheader'>Aktionen</th>
        </tr>
      </thead>
      <tbody role='rowgroup' aria-rowcount={initialActiveUsers.length}>
        {initialActiveUsers.length === 0
          ? (
            <tr role='row'>
              <td role='none' className='emptyTable' colSpan={5} aria-colspan={5}>Keine inaktiven Benutzer</td>
            </tr>
            )
          : initialActiveUsers.map(user => (
            <tr key={user.id} role='row'>
              <td role='cell' data-column='Name'>{user.displayName}</td>
              <td role='cell' data-column='Gender'>{genderIconMap[user.gender]}</td>
              <td role='cell' data-column='Nutzername'>@{user.username}</td>
              <td role='cell' data-column='E-Mail'>{user.email}</td>
              <td role='cell' data-column='Aktionen'>/</td>
            </tr>
          )
          )}
      </tbody>
      <tfoot role='rowgroup'>
        <tr role='row'>
          <td colSpan={5} aria-colspan={5}>{initialActiveUsers.length} / {activeUsersCount}</td>
        </tr>
      </tfoot>
    </table>
    <table role='table'>
      <caption role='caption'>Inaktive Benutzer</caption>
      <thead role='rowgroup'>
        <tr role='row'>
          <th role='columnheader'>Name</th>
          <th role='columnheader'>Gender</th>
          <th role='columnheader'>Nutzername</th>
          <th role='columnheader'>E-Mail</th>
          <th role='columnheader'>Aktionen</th>
        </tr>
      </thead>
      <tbody role='rowgroup' aria-rowcount={initialInactiveUsers.length}>
        {initialInactiveUsers.length === 0
          ? (
            <tr role='row'>
              <td role='none' className='emptyTable' colSpan={5} aria-colspan={5}>Keine inaktiven Benutzer</td>
            </tr>
            )
          : initialInactiveUsers.map(user => (
            <tr key={user.id} role='row'>
              <td role='cell' data-column='Name'>{user.displayName}</td>
              <td role='cell' data-column='Gender'>{genderIconMap[user.gender]}</td>
              <td role='cell' data-column='Nutzername'>@{user.username}</td>
              <td role='cell' data-column='E-Mail'>{user.email}</td>
              <td role='cell' data-column='Aktionen'>/</td>
            </tr>
          )
          )}
      </tbody>
      {initialInactiveUsers.length > 0
        ? (
          <tfoot role='rowgroup'>
            <tr role='row'>
              <td colSpan={5} aria-colspan={5}>{initialInactiveUsers.length} / {inactiveUsersCount}</td>
            </tr>
          </tfoot>
          )
        : null}
    </table>
  </>
)

export default Users
