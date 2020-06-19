#!/bin/bash

psql -U ubuntu -q -c "CREATE DATABASE re_manager"
echo "CREATED DATABASE re_manager"
#
#
#
#
#
#
echo "CREATING TABLES"

cat db/ddl_queries/tables/apartment_costs_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/apartments_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/building_cost_types_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/buildings_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/customers_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/countries_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/documents_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/owned_by_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/owner_communities_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/owner_community_costs_table.sql >> table_definition_queries.sql

cat db/ddl_queries/tables/owners_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/rented_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/tenants_done_payments_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/tenants_planned_payments_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/tenants_table.sql >> table_definition_queries.sql
cat db/ddl_queries/tables/users_table.sql >> table_definition_queries.sql



psql -U ubuntu -q -d re_manager --single-transaction -f table_definition_queries.sql
rm table_definition_queries.sql
echo "CREATED TABLES"
#
#
#
#
#
#
echo "ADDING FOREIGN KEY"

cat db/ddl_queries/constraints/fk_apartment_costs_ref_on_apartments.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_apartments_ref_on_buildings.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_buildings_ref_on_owner_communities.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_documents_ref_on_rented.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_owned_by_ref_on_apartments.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_owned_by_ref_on_owners.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_owner_community_costs_ref_on_building_cost_types.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_owner_community_costs_ref_on_owner_communities.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_owners_ref_on_customers.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_rented_ref_on_apartments.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_rented_ref_on_tenants.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_tenants_done_payments_ref_on_rented.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_tenants_planned_payments_ref_on_rented.sql >> add_constraints_queries.sql
cat db/ddl_queries/constraints/fk_tenants_ref_on_customers.sql >> add_constraints_queries.sql

psql -U ubuntu -q -d re_manager --single-transaction -f add_constraints_queries.sql
rm add_constraints_queries.sql
echo "ADDED FOREIGN KEY"
#
#
#
#
#
#
echo "CREATING VIEWS"
cat db/ddl_queries/views/v_apartment_costs_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_apartments_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_building_cost_types_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_buildings_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_customers_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_documents_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_owned_by_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_owner_communities_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_owner_community_costs_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_owners_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_rented_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_tenants_done_payments_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_tenants_planned_payments_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_tenants_view.sql >> create_view_queries.sql
cat db/ddl_queries/views/v_users_view.sql >> create_view_queries.sql

psql -U ubuntu -q -d re_manager --single-transaction -f create_view_queries.sql
rm create_view_queries.sql
echo "CREATED VIEWS"
#
#
echo "CREATING PROCEDURES"
cat db/ddl_queries/procedures/init.sql >> create_procedure_queries.sql
psql -U ubuntu -q -d re_manager --single-transaction -f create_procedure_queries.sql
rm create_procedure_queries.sql
#
#
echo "CREATING FUNCTIONS"
cat db/ddl_queries/functions/edit_apartment_costs.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_apartments.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_building_cost_types.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_buildings.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_customers.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_documents.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_owned_by.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_owner_communities.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_owner_community_costs.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_owners.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_rented.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_tenants.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_tenants_done_payments.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_tenants_planned_payments.sql >> create_functions_queries.sql
cat db/ddl_queries/functions/edit_users.sql >> create_functions_queries.sql

psql -U ubuntu -q -d re_manager --single-transaction -f create_functions_queries.sql
rm create_functions_queries.sql
echo "CREATED FUNCTIONS"
#
#
echo "CREATING TRIGGERS"
cat db/ddl_queries/triggers/v_apartment_costs_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_apartments_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_building_cost_types_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_buildings_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_customers_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_documents_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_owned_by_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_owner_communities_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_owner_community_costs_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_owners_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_rented_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_tenants_done_payments_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_tenants_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_tenants_planned_payments_instead_of_all.sql >> create_triggers_queries.sql
cat db/ddl_queries/triggers/v_users_instead_of_all.sql >> create_triggers_queries.sql
psql -U ubuntu -q -d re_manager --single-transaction -f create_triggers_queries.sql
rm create_triggers_queries.sql
echo "CREATED TRIGGERS"

psql -U ubuntu -d re_manager -c "call initialize()"


