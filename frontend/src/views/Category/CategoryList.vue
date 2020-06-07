<template>
  <div>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Category List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
            clearable
          ></v-text-field>
          <v-spacer></v-spacer>
          <add-category-modal v-on:add:item="addItem($event)"></add-category-modal>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <edit-category-modal :item="item" v-on:edit:item="editItem(items.indexOf(item), $event)"></edit-category-modal>
        <v-btn class="ml-2 red" fab x-small dark @click="deleteItem(item)">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Category from "@/apis/Category";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import EditCategoryModal from "@/components/modals/EditCategoryModal";

export default {
  components: {
    AddCategoryModal,
    EditCategoryModal
  },

  data() {
    return {
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Actions", sortable: false, filerable: false, value: "actions" }
      ],
      items: [],
      search: ""
    };
  },
  methods: {
    getCategories() {
      Category.all().then(response => {
        this.items = response.data.data;
      });
    },
    addItem(item) {
      this.items.push(item);
    },
    editItem(index, item) {
      Object.assign(this.items[index], item);
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        Category.delete(item.id).then(() => {
          this.items.splice(index, 1);
        });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>
