import { useState } from 'react'
import { useGetGoodsQuery, useAddGoodMutation } from './redux'

export const App = () => {
    const [limit, setLimit] = useState('')
    const [newGood, setNewGood] = useState('')

    const { isLoading, data, isSuccess } = useGetGoodsQuery({ limit })
    const [addProduct, { isError }] = useAddGoodMutation()

    const handleAddGood = async () => {
        if (newGood) {
            await addProduct({ name: newGood }).unwrap()
            setNewGood('')
        }
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
                        <li key={good.id}>{good.name}</li>
                    ))}
                </ul>
            )}
        </div>
    ) : (
        <div>loading</div>
    )
}
