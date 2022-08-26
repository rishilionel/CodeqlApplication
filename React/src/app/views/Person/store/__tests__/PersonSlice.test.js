import store from 'app/redux/store'
import { personAdded, personDeleted, personUpdated } from '../personSlice'

describe('testing person redux store reducers', () => {
    test('add person to store test', () => {
        let state = store.getState().person
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            Name: 'Name',
        }
        store.dispatch(personAdded(initialInput))
        state = store.getState().person
        expect(state.entities).toHaveLength(1)
    })

    test('update person from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            Name: 'Name',
        }
        store.dispatch(personAdded(initialInput))
        let state = store.getState().person
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            Name: 'Name1',
        }
        store.dispatch(personUpdated(updatedInput))
        state = store.getState().person
        let changedPerson = state.entities.find((p) => p.id === 2)
        expect(changedPerson).toStrictEqual(updatedInput)
    })

    test('delete person from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            Name: 'Name',
        }
        store.dispatch(personAdded(initialInput))
        let state = store.getState().person
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            personDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().person
        expect(state.entities).toHaveLength(2)
    })
})
