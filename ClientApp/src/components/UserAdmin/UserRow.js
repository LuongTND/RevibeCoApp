import React, { PureComponent } from 'react';

class UserRow extends PureComponent {
    handleDelete = () => {
        const { user, onDelete } = this.props;
        onDelete(user.id);
    };

    handleRestore = () => {
        const { user, onRestore } = this.props;
        onRestore(user.id);
    };

    render() {
        const { user, loadingDelete } = this.props;
        return (
            <tr>
                <td><img src={user.imgUrl} alt="avatar" width={40} /></td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.emailConfirmed ? 'Confirmed' : 'Unconfirmed'}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address1}</td>
                <td>{user.address2}</td>
                <td>{user.isDeleted ? 'Inactive' : 'Active'}</td>
                <td>{user.roles}</td>
                <td className='mr-5'>
                    {user.isDeleted ? (
                        <button className="btn btn-success" onClick={this.handleRestore} disabled={loadingDelete}>
                            {loadingDelete ? 'Restoring...' : 'Restore'}
                        </button>
                    ) : (
                        <button className="btn btn-danger" onClick={this.handleDelete} disabled={loadingDelete}>
                            {loadingDelete ? 'Deleting...' : 'Delete'}
                        </button>
                    )}
                </td>
            </tr>
        );
    }
}

export default UserRow;
