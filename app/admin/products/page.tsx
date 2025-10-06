'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// 더미 데이터
const initialProducts = [
  { id: 1, name: 'AI 자영업 퍼널 시스템', price: 5000, thumbnail: '🏪', registeredDate: '2024-01-10' },
  { id: 2, name: 'AI 창업 패키지', price: 5000, thumbnail: '🚀', registeredDate: '2024-02-15' },
  { id: 3, name: 'N잡 자동화 시스템', price: 5000, thumbnail: '💼', registeredDate: '2024-03-20' },
  { id: 4, name: '코인 알림봇', price: 3000, thumbnail: '🪙', registeredDate: '2024-04-25' },
  { id: 5, name: 'AI Agent 패키지', price: 7000, thumbnail: '🤖', registeredDate: '2024-05-30' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    thumbnail: '📦',
  })

  // 상품 삭제
  const deleteProduct = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  // 상품 등록
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('상품명과 가격을 입력해주세요')
      return
    }

    const product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      thumbnail: newProduct.thumbnail,
      registeredDate: new Date().toISOString().split('T')[0],
    }

    setProducts([...products, product])
    setNewProduct({ name: '', price: '', thumbnail: '📦' })
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">상품관리</h1>
          <p className="text-neutral-400">총 {products.length}개의 상품</p>
        </div>

        {/* 신규 상품 등록 버튼 */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus size={20} />
              <span>신규 상품 등록</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>신규 상품 등록</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm text-neutral-400 mb-2 block">상품명</label>
                <Input
                  placeholder="상품명 입력"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-neutral-400 mb-2 block">가격 (원)</label>
                <Input
                  type="number"
                  placeholder="가격 입력"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-neutral-400 mb-2 block">썸네일 이모지</label>
                <Input
                  placeholder="이모지 입력 (예: 🎁)"
                  value={newProduct.thumbnail}
                  onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
                />
              </div>
              <Button onClick={addProduct} className="w-full">
                등록하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 테이블 */}
      <div className="bg-[#111318] rounded-2xl shadow-md border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>썸네일</TableHead>
                <TableHead>상품명</TableHead>
                <TableHead>가격</TableHead>
                <TableHead>등록일</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="text-3xl">{product.thumbnail}</div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-neutral-400">
                    ₩{product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-neutral-400">{product.registeredDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                      className="flex items-center space-x-1"
                    >
                      <Trash2 size={16} />
                      <span>삭제</span>
                    </Button>
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
