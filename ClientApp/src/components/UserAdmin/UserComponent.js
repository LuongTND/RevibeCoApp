import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchUsers, deleteUser, restoreUser } from '../../redux/actions/userActions';
import authService from '../api-authorization/AuthorizeService';
import UserRow from './UserRow';

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            pageSize: 6
        };
    }

    componentDidMount() {
        this.populateUserData();
    }

    async populateUserData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');
        if (roles) {
            const { currentPage, pageSize } = this.state;
            this.props.fetchUsers(currentPage + 1, pageSize, token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }
    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({ currentPage: selected }, () => {
            this.populateUserData();
        });
    };
    render() {
        const { loadingUsers, loadingDelete, users, error, totalPages, deleteUser, restoreUser } = this.props;

        let contents = loadingUsers
            ? <p style={{ height: '600px' }}><em>Loading...</em></p>
            : error
                ? <p><em>{error}</em></p>
                : (
                    <table className="table table-striped" aria-labelledby="tableLabel" style={{ height: '600px' }}>
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>User name</th>
                                <th>Email</th>
                                <th>EmailConfirmed</th>
                                <th>Phone number</th>
                                <th>Address1</th>
                                <th>Address2</th>
                                <th>IsDeleted</th>
                                <th>Roles</th>
                                <th style={{ width : '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    onDelete={deleteUser}
                                    onRestore={restoreUser}
                                    loadingDelete={loadingDelete}
                                />
                            )}
                        </tbody>
                    </table>
                );

        return (
            <div>
                <h1 id="tableLabel">User List</h1>
                <p>This component demonstrates fetching user data from the server.</p>
                {contents}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLinkClassName="page-link"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loadingUsers: state.userReducer.loadingUsers,
        loadingDelete: state.userReducer.loadingDelete,
        users: state.userReducer.users,
        error: state.userReducer.error,
        totalPages: state.userReducer.totalPages
    };
};

const mapDispatchToProps = {
    fetchUsers,
    deleteUser,
    restoreUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
