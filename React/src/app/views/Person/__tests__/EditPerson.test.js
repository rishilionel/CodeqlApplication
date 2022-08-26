const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EditPerson from '../EditPerson'
import { PersonAdded } from '../store/PersonSlice'
beforeAll(() => {
    store.dispatch(
        PersonAdded({
            id: 1,
            Name: 'Name',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Person/edit/1" replace />
                                }
                            />
                            <Route
                                path="Person/edit/:id"
                                element={<EditPerson />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of PersonEdit Component', () => {
    test('should render EditPerson and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const savePersonButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const NameElement = screen.getByLabelText(/Name/i)

        expect(savePersonButtonElement).toBeInTheDocument()

        expect(NameElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Person edit form', async () => {
        const NameElement = screen.getByLabelText(/Name/i)

        fireEvent.change(NameElement, { target: { value: 'Name' } })

        expect(NameElement.value).toBe('Name')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const NameElement = screen.getByLabelText(/Name/i)

        fireEvent.change(NameElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const savePersonButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(savePersonButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(1)
    })
})
