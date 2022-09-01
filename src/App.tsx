import { useState } from 'react'
import { useGetGoodsQuery, useAddGoodMutation, useDeleteGoodMutation } from './redux'

export const App = () => {
    const [limit, setLimit] = useState('')
    const [newGood, setNewGood] = useState('')

    const { isLoading, data, isSuccess } = useGetGoodsQuery({ limit })
    const [addProduct, { isError: addGoodError }] = useAddGoodMutation()
    const [deleteProduct, { isError: deleteGoodError }] = useDeleteGoodMutation()

    const handleAddGood = async () => {
        if (newGood) {
            await addProduct({ name: newGood }).unwrap()
            setNewGood('')
        }
    }

    const handleDeleteGood = async (id: number) => {
        await deleteProduct(id).unwrap()
    }

    if (addGoodError || deleteGoodError) {
        alert('server error!')
        return null
    }

    return !isLoading ? (
        <div className='app'>
            <input type='text' value={newGood} onChange={(e) => setNewGood(e.target.value)} />
            <button onClick={handleAddGood}>add good</button>
            <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value=''>all</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
            {isSuccess && (
                <ul>
                    {data?.map((good) => (
                        <li key={good.id} className='flex gap-4'>
                            <div>{good.name}</div>
                            <span
                                onClick={() => handleDeleteGood(good.id)}
                                className='material-icons-round cursor-pointer hover:!text-red-500'
                            >
                                delete
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    ) : (
        <div>loading</div>
    )
}
