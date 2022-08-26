import { createSlice } from '@reduxjs/toolkit'
import { fetchPerson } from './Person.action'
import { addPerson } from './Person.action'
import { editPerson } from './Person.action'
import { deletePerson } from './Person.action'

const fetchPersonExtraReducer = {
    [fetchPerson.pending]: (state, action) => {
        state.loading = true
    },
    [fetchPerson.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchPerson.rejected]: (state, action) => {
        state.loading = false
    },
}

const addPersonExtraReducer = {
    [addPerson.pending]: (state, action) => {
        state.loading = true
    },
    [addPerson.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addPerson.rejected]: (state, action) => {
        state.loading = false
    },
}

const editPersonExtraReducer = {
    [editPerson.pending]: (state, action) => {
        state.loading = true
    },
    [editPerson.fulfilled]: (state, action) => {
        const { id, name } = action.payload
        const existingPerson = state.entities.find(
            (Person) => Person.id.toString() === id.toString()
        )
        if (existingPerson) {
            existingPerson.name = name
        }
        state.loading = false
    },
    [editPerson.rejected]: (state, action) => {
        state.loading = false
    },
}

const deletePersonExtraReducer = {
    [deletePerson.pending]: (state, action) => {
        state.loading = true
    },
    [deletePerson.fulfilled]: (state, action) => {
        const id = action.payload
        const existingPerson = state.entities.find(
            (Person) => Person.id.toString() === id.toString()
        )
        if (existingPerson) {
            state.entities = state.entities.filter((Person) => Person.id !== id)
        }
        state.loading = false
    },
    [deletePerson.rejected]: (state, action) => {
        state.loading = false
    },
}
const PersonSlice = createSlice({
    name: 'Person',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        PersonAdded(state, action) {
            state.entities.push(action.payload)
        },
        PersonUpdated(state, action) {
            const { id, name } = action.payload
            const existingPerson = state.entities.find(
                (Person) => Person.id.toString() === id.toString()
            )
            if (existingPerson) {
                existingPerson.name = name
            }
        },
        PersonDeleted(state, action) {
            const { id } = action.payload
            const existingPerson = state.entities.find(
                (Person) => Person.id.toString() === id.toString()
            )
            if (existingPerson) {
                state.entities = state.entities.filter(
                    (Person) => Person.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchPersonExtraReducer,
        ...addPersonExtraReducer,
        ...editPersonExtraReducer,
        ...deletePersonExtraReducer,
    },
})

export const { PersonAdded, PersonUpdated, PersonDeleted } = PersonSlice.actions

export default PersonSlice.reducer
