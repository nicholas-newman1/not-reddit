import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import PostPreview from '.';

describe('<PostPreview />', () => {
  const props = {
    commentsHref: '/posts/3131fnu91h1e#comments',
    numOfComments: 12,
    onDownVote: () => {},
    onSave: () => {},
    onShare: () => {},
    onReport: () => {},
    onUpVote: () => {},
    postHref: '/posts/3131fnu91h1e',
    rating: 143,
    ratingStatus: 'up' as 'up',
    title:
      'Hello if i looked at the sun I would see how beautiful it is, and then go blind',
    username: 'ovechking899',
    userProfileHref: '/profiles/ovechking899',
    timestamp: 1614429965,
    category: 'meditation',
    categoryHref: '/categories/meditation',
  };

  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );
  });

  it('should render rating', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/143/);
  });

  it('should render username', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/ovechking899/i);
  });

  it('should render time ago string', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/ago/i);
  });

  it('should render category', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/meditation/i);
  });

  it('should render title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/Hello if i looked at/i);
  });

  it('should render comments link with correct number of comments', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/comments \(12\)/i);
  });

  it('should render save button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/save/i);
  });

  it('should render share button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/share/i);
  });

  it('should render report button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} />
      </MemoryRouter>
    );

    getByText(/save/i);
  });

  it('should go to profile route', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    const { getByText } = render(
      <Router history={history}>
        <PostPreview {...props} />
      </Router>
    );

    const username = getByText(/ovechking899/i);
    fireEvent.click(username);

    expect(history.push).toBeCalledWith('/profiles/ovechking899');
  });

  it('should go to category route', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    const { getByText } = render(
      <Router history={history}>
        <PostPreview {...props} />
      </Router>
    );

    const category = getByText(/meditation/i);
    fireEvent.click(category);

    expect(history.push).toBeCalledWith('/categories/meditation');
  });

  it('should go to comments route', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    const { getByText } = render(
      <Router history={history}>
        <PostPreview {...props} />
      </Router>
    );

    const comments = getByText(/comments/i);
    fireEvent.click(comments);

    expect(history.push).toBeCalledWith('/posts/3131fnu91h1e#comments');
  });

  it('should call onUpVote after clicking up arrow', () => {
    const onUpVote = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <PostPreview {...props} onUpVote={onUpVote} />
      </MemoryRouter>
    );

    const upArrow = getByTestId('up-arrow');

    expect(onUpVote).not.toHaveBeenCalled();
    fireEvent.click(upArrow);
    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call onDownVote after clicking down arrow', () => {
    const onDownVote = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <PostPreview {...props} onDownVote={onDownVote} />
      </MemoryRouter>
    );

    const downArrow = getByTestId('down-arrow');

    expect(onDownVote).not.toHaveBeenCalled();
    fireEvent.click(downArrow);
    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('should call onSave after clicking save button', () => {
    const onSave = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} onSave={onSave} />
      </MemoryRouter>
    );

    const saveBtn = getByText(/save/i);

    expect(onSave).not.toHaveBeenCalled();
    fireEvent.click(saveBtn);
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('should call onShare after clicking share button', () => {
    const onShare = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} onShare={onShare} />
      </MemoryRouter>
    );

    const shareBtn = getByText(/share/i);

    expect(onShare).not.toHaveBeenCalled();
    fireEvent.click(shareBtn);
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it('should call onReport after clicking report button', () => {
    const onReport = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <PostPreview {...props} onReport={onReport} />
      </MemoryRouter>
    );

    const reportBtn = getByText(/report/i);

    expect(onReport).not.toHaveBeenCalled();
    fireEvent.click(reportBtn);
    expect(onReport).toHaveBeenCalledTimes(1);
  });
});
