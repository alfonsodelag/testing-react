import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';


// ! Testing Suites is a way to organize all specific tests in one group. For this we use the "DESCRIBE()" method, which is globally available function
// ! describe() receives two arguments: the first is a description of the category to which the tests belong. The second argument is an anonymous function,
// ! where you put all the tests.
describe('Greeting component', () => {
    // ! The test() function is globally enabled. 
    // ! We must give test() a description
    test('renders Hello World as a Text', () => {
        // ! ARRANGE
        render(<Greeting />);

        // ! ACT


        // ! ASSERT
        // ! So we want to for example select an element to check a text. For this we use SCREEN, which gives us access to this "virtual screen" or DOM.
        // ! We can pass a second argument to getByText, passing "exact", which can test if the casing matters or not. So if we set it to false, casing wont matter, By default exact is set to true
        const helloWorldElement = screen.getByText('Hello World!', { exact: true })
        // ! Now we must make the the actual assertion. We can check if the element exists, for this we use the EXPECT method
        // ! The "toBeInDocument" will check if this text is in the document. You could also add a ".not." before it, to check if the text ist NOT in the document!
        expect(helloWorldElement).toBeInTheDocument();
    });


    test('renders good to see you if the button was NOT clicked', () => {
        render(<Greeting />);

        const outputElement = screen.getByText('good to see you!', { exact: false })

        expect(outputElement).toBeInTheDocument();
    });


    // ! Test for when we click the button
    test('render Changed! if the button was clicked', () => {
        // ! Arrange
        render(<Greeting />);

        // ! ACT: We want to simulate a button being clicked. So we will import userEvent from '@testing-library/user-event';
        const buttonElement = screen.getByRole('button'); // ! Using getByRole() is just another way to access the button. You could use getByText() to do the same
        userEvent.click(buttonElement);

        // ! Assert
        const outputElement = screen.getByText('Changed!')
        expect(outputElement).toBeInTheDocument();
    });


    // ! Now we will test if the text "It's good to see you!" dissappears after clicking the button
    test('does not good to see you if the button was clicked', () => {
        // ! ARRANGE
        render(<Greeting />);

        // ! ACT
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        const outputElement = screen.queryByText('good to see you', { exact: false });
        expect(outputElement).toBeNull();

    })
})
