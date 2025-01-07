import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-panel';
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'Viewer' },
    { id: 4, name: 'Sara Connor', email: 'sara@example.com', role: 'Editor' },
  ];

  filteredUsers = [...this.users];
  searchTerm: string = '';
  itemsPerPage: number = 2; 
  currentPage: number = 1;
  editingUserId: number | null = null; 
  modalVisible: boolean = false; 
  userToDelete: number | null = null; 

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
  searchUsers() {
    const lowerTerm = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm)
    );
  }

  
  confirmDelete(userId: number) {
    this.modalVisible = true;
    this.userToDelete = userId;
  }

  deleteUser() {
    if (this.userToDelete !== null) {
      this.users = this.users.filter((user) => user.id !== this.userToDelete);
      this.modalVisible = false;
      this.userToDelete = null;
      this.searchUsers();
    }
  }

  cancelDelete() {
    this.modalVisible = false;
    this.userToDelete = null;
  }

  
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  
  startEdit(userId: number) {
    this.editingUserId = userId;
  }

  saveEdit() {
    this.editingUserId = null; 
  }

  cancelEdit() {
    this.editingUserId = null; 
    this.searchUsers(); 
  }
}
