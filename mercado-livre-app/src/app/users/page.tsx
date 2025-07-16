'use client'

import { useEffect, useState } from 'react'
import { User, useApi } from '@/lib/api'
import { Loader2, AlertCircle, User as UserIcon, Mail, Phone, MapPin, Plus } from 'lucide-react'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const api = useApi()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.users.getAll()
        
        if (response.success) {
          setUsers(response.data)
        } else {
          setError('Erro ao carregar usuários')
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor')
        console.error('Erro ao buscar usuários:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Carregando usuários...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ops! Algo deu errado</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-600">Gerencie os usuários do sistema</p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Usuário
        </button>
      </div>

      {/* Formulário de novo usuário */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Adicionar Novo Usuário</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Implementar envio do formulário
            setShowForm(false)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha *
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite a senha"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rua, número, cidade"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de usuários */}
      {users.length === 0 ? (
        <div className="text-center py-12">
          <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum usuário encontrado
          </h2>
          <p className="text-gray-600">
            Adicione o primeiro usuário clicando no botão acima
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.nome}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ID: {user.id}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                
                {user.telefone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.telefone}
                  </div>
                )}
                
                {user.endereco && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {user.endereco}
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Cadastrado em: {new Date(user.data_criacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                  Editar
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
