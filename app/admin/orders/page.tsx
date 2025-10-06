'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// 더미 데이터
const initialOrders = [
  { id: 1, customerName: '김철수', product: 'AI 자영업 퍼널 시스템', amount: 5000, status: 'paid', date: '2024-01-15' },
  { id: 2, customerName: '이영희', product: 'AI 창업 패키지', amount: 5000, status: 'pending', date: '2024-02-20' },
  { id: 3, customerName: '박민수', product: 'N잡 자동화 시스템', amount: 5000, status: 'paid', date: '2024-03-10' },
  { id: 4, customerName: '최지은', product: '코인 알림봇', amount: 3000, status: 'pending', date: '2024-04-05' },
  { id: 5, customerName: '정우성', product: 'AI Agent 패키지', amount: 7000, status: 'paid', date: '2024-05-12' },
  { id: 6, customerName: '강감찬', product: 'AI 자영업 퍼널 시스템', amount: 5000, status: 'paid', date: '2024-06-18' },
  { id: 7, customerName: '윤아름', product: 'N잡 자동화 시스템', amount: 5000, status: 'pending', date: '2024-07-22' },
  { id: 8, customerName: '서준호', product: '코인 알림봇', amount: 3000, status: 'paid', date: '2024-08-30' },
]

type OrderStatus = 'paid' | 'pending'

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)

  // 상태 변경
  const changeStatus = (id: number, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">신청내역 관리</h1>
          <p className="text-neutral-400">총 {orders.length}건의 신청</p>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-[#111318] rounded-2xl shadow-md border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>신청자명</TableHead>
                <TableHead>신청상품</TableHead>
                <TableHead>결제금액</TableHead>
                <TableHead>신청일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.customerName}</TableCell>
                  <TableCell className="text-neutral-400">{order.product}</TableCell>
                  <TableCell className="text-neutral-400">
                    ₩{order.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-neutral-400">{order.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'paid'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {order.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={order.status}
                      onValueChange={(value) => changeStatus(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
