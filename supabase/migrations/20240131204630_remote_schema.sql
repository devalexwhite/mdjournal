create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));


create policy "Give anon users access to view 1rma4z_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'posts'::text));


create policy "Give users authenticated access to folder 1rma4z_0"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'posts'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1rma4z_1"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'posts'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1rma4z_2"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'posts'::text) AND (auth.role() = 'authenticated'::text)));



