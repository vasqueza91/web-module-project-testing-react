import react from 'react';
import { render, screen, waitFor  } from '@testing-library/react';
import Display from '../Display';
import userEvent from '@testing-library/user-event';
import mockFetchShow from '../../api/fetchShow'

const testShow = {
    name: "Stranger Things",
    summary: "One Summer Can Change Everything",
    seasons: [
        {id:0, name: "Season 1", episode: []},
        {id:1, name: "Season 2", episode: []},
        {id:2, name: "Season 3", episode: []},
    ]
}

test('renders display component without any props passed in', () => {
    render(<Display />);
    const display = screen.queryByText(/press to get show data/i);
    expect(display).toBeInTheDocument();
})

test("when the fetch button is pressed, the show component will display", async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow);

    const showDetails = await screen.queryByTestOd('show-container');
    expect(showDetails).toBeInTheDocument();
})

test('when the fetch button is pressed, the amounbt of select options rendered is equal to the amount of seasons in your test data', async () => {
    render(<Display />);
    mockFetchShow.mockResolvedValueOnce(testShow);

    const button = screen.queryByRole('button');
    userEvent.click(button);

    const seasons = await screen.findAllByTestId('seasons-option');
    expect(seasons).toHaveLength(3);
})














///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.