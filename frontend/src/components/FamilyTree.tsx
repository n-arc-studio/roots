import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Person {
  id: string
  name: string
  birthDate?: string
  children?: Person[]
}

const sampleData: Person = {
  id: '1',
  name: '祖父母',
  birthDate: '1940-01-01',
  children: [
    {
      id: '2',
      name: '父',
      birthDate: '1965-05-15',
      children: [
        { id: '4', name: 'あなた', birthDate: '1995-08-20' },
        { id: '5', name: '兄弟', birthDate: '1998-03-10' },
      ],
    },
    {
      id: '3',
      name: '母',
      birthDate: '1967-11-25',
    },
  ],
}

interface Props {
  editable?: boolean
  onAddPerson?: (parentId: string) => void
  onEditPerson?: (personId: string) => void
  onDeletePerson?: (personId: string) => void
}

export default function FamilyTree({ 
  editable = false,
  onAddPerson,
  onEditPerson,
  onDeletePerson 
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // SVGをクリア
    d3.select(svgRef.current).selectAll('*').remove()

    const width = 900
    const height = 600
    const margin = { top: 40, right: 120, bottom: 40, left: 120 }

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // ツリーレイアウトを作成
    const treeLayout = d3.tree<Person>().size([
      height - margin.top - margin.bottom,
      width - margin.left - margin.right,
    ])

    // 階層データを作成
    const root = d3.hierarchy(sampleData)
    const treeData = treeLayout(root)

    // リンク（線）を描画
    svg
      .selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#4A90E2')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.6)
      .attr(
        'd',
        d3
          .linkHorizontal<d3.HierarchyPointLink<Person>, d3.HierarchyPointNode<Person>>()
          .x((d) => d.y)
          .y((d) => d.x)
      )

    // ノード（人物）グループ
    const nodes = svg
      .selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.y},${d.x})`)
      .style('cursor', editable ? 'pointer' : 'default')
      .on('click', (_event, d) => {
        if (editable) {
          setSelectedNode(d.data.id)
        }
      })

    // 円を追加
    nodes
      .append('circle')
      .attr('r', 10)
      .attr('fill', (d) => (d.children ? '#7B68EE' : '#FFB347'))
      .attr('stroke', (d) => selectedNode === d.data.id ? '#FF6B6B' : '#fff')
      .attr('stroke-width', (d) => selectedNode === d.data.id ? 4 : 2.5)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))')

    // 名前テキストを追加
    nodes
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d) => (d.children ? -18 : 18))
      .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .style('font-size', '15px')
      .style('font-weight', '600')
      .style('fill', '#2C3E50')
      .text((d) => d.data.name)

    // 生年月日を追加
    nodes
      .append('text')
      .attr('dy', '1.8em')
      .attr('x', (d) => (d.children ? -18 : 18))
      .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .style('font-size', '11px')
      .style('fill', '#7f8c8d')
      .text((d) => d.data.birthDate || '')
  }, [selectedNode, editable])

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-roots-dark">
          {editable ? '家系図を編集' : '家系図プレビュー'}
        </h3>
        {editable && (
          <div className="flex gap-2">
            <button
              onClick={() => selectedNode && onAddPerson?.(selectedNode)}
              disabled={!selectedNode}
              className="flex items-center gap-2 px-4 py-2 bg-roots-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={18} />
              子を追加
            </button>
            <button
              onClick={() => selectedNode && onEditPerson?.(selectedNode)}
              disabled={!selectedNode}
              className="flex items-center gap-2 px-4 py-2 bg-roots-secondary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit size={18} />
              編集
            </button>
            <button
              onClick={() => selectedNode && onDeletePerson?.(selectedNode)}
              disabled={!selectedNode}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
              削除
            </button>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <svg ref={svgRef}></svg>
      </div>
      
      {editable && (
        <p className="text-sm text-gray-500 mt-4">
          💡 ヒント: 人物をクリックして選択し、操作ボタンで編集できます
        </p>
      )}
      {!editable && (
        <p className="text-sm text-gray-500 mt-4">
          ※ これはサンプルデータです。実際の家系図を作成できます。
        </p>
      )}
    </div>
  )
}
