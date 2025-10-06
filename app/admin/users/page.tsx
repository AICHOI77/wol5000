'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// 더미 데이터
const initialUsers = [
  { id: 1, name: '김철수', email: '[email protected]', joinDate: '2024-01-15', status: 'active' },
  { id: 2, name: '이영희', email: '[email protected]', joinDate: '2024-02-20', status: 'active' },
  { id: 3, name: '박민수', email: '[email protected]', joinDate: '2024-03-10', status: 'inactive' },
  { id: 4, name: '최지은', email: '[email protected]', joinDate: '2024-04-05', status: 'active' },
  { id: 5, name: '정우성', email: '[email protected]', joinDate: '2024-05-12', status: 'active' },
  { id: 6, name: '강감찬', email: '[email protected]', joinDate: '2024-06-18', status: 'inactive' },
  { id: 7, name: '윤아름', email: '[email protected]', joinDate: '2024-07-22', status: 'active' },
  { id: 8, name: '서준호', email: '[email protected]', joinDate: '2024-08-30', status: 'active' },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')

  // 상태 토글
  const toggleStatus = (id: number) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  // 검색 필터
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">회원관리</h1>
          <p className="text-neutral-400">총 {users.length}명의 회원</p>
        </div>
      </div>

      {/* 검색바 */}
      <div className="bg-[#111318] rounded-2xl p-6 shadow-md border border-white/5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
          <Input
            placeholder="이름 또는 이메일로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-[#111318] rounded-2xl shadow-md border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>가입일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-neutral-400">{user.email}</TableCell>
                  <TableCell className="text-neutral-400">{user.joinDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === 'active' ? '비활성화' : '활성화'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 검색 결과 없음 */}
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-neutral-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
