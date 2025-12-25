import 'package:flutter/material.dart';
import '../widgets/glass_card.dart';

class BulkDownloadTab extends StatefulWidget {
  const BulkDownloadTab({super.key});

  @override
  State<BulkDownloadTab> createState() => _BulkDownloadTabState();
}

class _BulkDownloadTabState extends State<BulkDownloadTab> {
  final TextEditingController _urlsController = TextEditingController();

  void _processBatch() {
    final text = _urlsController.text.trim();
    if (text.isEmpty) return;
    
    final urls = text.split('\n').where((u) => u.trim().isNotEmpty).toList();
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("Processing ${urls.length} links...")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: SingleChildScrollView(
        child: Column(
          children: [
            GlassCard(
              child: Column(
                children: [
                  TextField(
                    controller: _urlsController,
                    maxLines: 6,
                    decoration: InputDecoration(
                      hintText: "Paste multiple links (one per line)...",
                      hintStyle: TextStyle(color: Colors.white.withOpacity(0.3)),
                      filled: true,
                      fillColor: Colors.black.withOpacity(0.2),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(15),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    height: 55,
                    child: ElevatedButton(
                      onPressed: _processBatch,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Text("PROCESS BATCH", style: TextStyle(letterSpacing: 1.2)),
                          SizedBox(width: 10),
                          Icon(Icons.layers_rounded, size: 20),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
